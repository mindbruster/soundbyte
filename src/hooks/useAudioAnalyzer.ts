import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioAnalyzerState {
  isListening: boolean;
  frequencyData: Uint8Array;
  averageFrequency: number;
  error: string | null;
}

export function useAudioAnalyzer() {
  const [state, setState] = useState<AudioAnalyzerState>({
    isListening: false,
    frequencyData: new Uint8Array(128),
    averageFrequency: 0,
    error: null,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;

      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      setState(prev => ({ ...prev, isListening: true, error: null }));

      const analyze = () => {
        if (!analyserRef.current) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        setState(prev => ({
          ...prev,
          frequencyData: dataArray,
          averageFrequency: average,
        }));

        animationFrameRef.current = requestAnimationFrame(analyze);
      };

      analyze();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Microphone access denied. Please allow microphone access to use this feature.',
      }));
    }
  }, []);

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setState(prev => ({
      ...prev,
      isListening: false,
      frequencyData: new Uint8Array(128),
      averageFrequency: 0,
    }));
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    ...state,
    startListening,
    stopListening,
  };
}
