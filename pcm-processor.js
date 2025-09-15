class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0][0];
    if (!input) return true;

    const pcm16 = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      let val = input[i] * 32767;
      pcm16[i] = Math.max(-32768, Math.min(32767, val));
    }

    this.port.postMessage(pcm16.buffer, [pcm16.buffer]);
    return true;
  }
}

registerProcessor("pcm-processor", PCMProcessor);
