# Using Nous-Hermes-2-Mistral-DPO/7B Model with Modular

This guide explains how to use the Nous-Hermes-2-Mistral-DPO/7B model from [Modular](https://builds.modular.com/models/Nous-Hermes-2-Mistral-DPO/7B).

## Important Note

⚠️ **Direct Download Not Available**: Modular models are not designed for direct file downloads. They are meant to be used with Modular's MAX platform and tools.

## How to Use the Model

### Method 1: Using MAX Serve (Recommended)

The model is designed to work with Modular's MAX platform. Here's how to use it:

```bash
# Install Modular MAX
pip install modular --index-url https://download.pytorch.org/whl/cpu

# Start a local endpoint for the model
max serve --model-path NousResearch/Nous-Hermes-2-Mistral-7B-DPO
```

The endpoint will be ready when you see:
```
Server ready on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Method 2: Using Docker Container

You can also run the model in a Docker container:

```bash
docker run --gpus 1 \
    -v ~/.cache/huggingface:/root/.cache/huggingface \
    --env "HF_HUB_ENABLE_HF_TRANSFER=1" \
    --env "HF_TOKEN=" \
    -p 8000:8000 \
    modular/max-nvidia-base:nightly \
    --model-path NousResearch/Nous-Hermes-2-Mistral-7B-DPO
```

### Method 3: Using Hugging Face Directly

Since this is a Hugging Face model, you can also use it directly:

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the model
model_name = "NousResearch/Nous-Hermes-2-Mistral-7B-DPO"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Use the model
inputs = tokenizer("Hello, how are you?", return_tensors="pt")
outputs = model.generate(**inputs, max_length=100)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(response)
```

## Model Information

- **Name**: Nous-Hermes-2-Mistral-DPO-7B
- **Source**: Modular Inc. / NousResearch
- **License**: Apache 2.0
- **Size**: ~7B parameters (several GB)
- **Architecture**: Based on Mistral architecture with DPO training
- **Hugging Face**: https://huggingface.co/NousResearch/Nous-Hermes-2-Mistral-7B-DPO

## Testing the Model

Once you have the endpoint running, you can test it with curl:

```bash
curl -N http://0.0.0.0:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "NousResearch/Nous-Hermes-2-Mistral-7B-DPO",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the World Series in 2020?"}
    ]
}'
```

## Prerequisites

- Python 3.8+
- Modular MAX package
- Sufficient RAM (at least 16GB recommended for 7B models)
- GPU support (optional but recommended for performance)

## Troubleshooting

### Common Issues

1. **Out of Memory**: Ensure you have sufficient RAM and consider using quantization
2. **Model Not Found**: Verify the model path is correct
3. **Installation Issues**: Make sure you're using the correct package index
4. **GPU Issues**: Check your CUDA installation and GPU compatibility

### Getting Help

- Check the [Modular documentation](https://docs.modular.com/)
- Visit the [Modular community forum](https://community.modular.com/)
- Review the [MAX tutorials](https://docs.modular.com/max/tutorials?filterByTags&tag=max)

## Alternative: Download from Hugging Face

If you need the actual model files, you can download them directly from Hugging Face:

```bash
# Using git-lfs
git lfs install
git clone https://huggingface.co/NousResearch/Nous-Hermes-2-Mistral-7B-DPO

# Or using huggingface-hub
pip install huggingface-hub
huggingface-cli download NousResearch/Nous-Hermes-2-Mistral-7B-DPO
```

## Next Steps

After setting up the model, you can:

1. Integrate it into your applications using the API endpoint
2. Fine-tune it for specific tasks
3. Use it with other AI frameworks that support Hugging Face models
4. Explore the model's capabilities through the chat interface

## Support

For issues with Modular MAX or the model:

1. Check the console output for error messages
2. Refer to the troubleshooting section above
3. Check Modular documentation and community resources
4. Ensure you're using the correct model path and configuration
