# Nous-Hermes-2-Mistral-DPO/7B Model Setup

This project provides a complete setup for using the Nous-Hermes-2-Mistral-DPO/7B model from Modular.

## Quick Start

### 1. Automatic Setup (Recommended)

```bash
# Run the setup script
./setup_model.sh

# Activate the virtual environment
source .venv/bin/activate

# Start interactive chat
python use_model.py --interactive
```

### 2. Manual Setup

```bash
# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Use the model
python use_model.py --interactive
```

### 3. Using NPM Scripts

```bash
# Interactive chat mode
npm run use-model

# Single prompt mode
npm run model-prompt "What is artificial intelligence?"
```

## What This Provides

✅ **Complete Python Environment**: Virtual environment with all dependencies  
✅ **Easy-to-Use Scripts**: Both Python and NPM interfaces  
✅ **Interactive Chat**: Full conversation mode with memory  
✅ **Single Prompts**: Quick question-answer mode  
✅ **Memory Efficient**: Optimized for different hardware configurations  
✅ **Error Handling**: Comprehensive error messages and troubleshooting  

## Model Information

- **Name**: Nous-Hermes-2-Mistral-DPO-7B
- **Source**: Modular Inc. / NousResearch
- **License**: Apache 2.0
- **Size**: ~7B parameters (~7GB download)
- **Architecture**: Mistral-based with DPO training
- **Format**: ChatML (compatible with OpenAI-style APIs)

## System Requirements

- **RAM**: Minimum 16GB (32GB+ recommended)
- **Storage**: At least 10GB free space
- **Python**: 3.8 or higher
- **GPU**: Optional but recommended for performance

## Files Overview

- `use_model.py` - Main Python script for using the model
- `setup_model.sh` - Automated setup script
- `requirements.txt` - Python dependencies
- `MODEL_DOWNLOAD.md` - Detailed usage instructions
- `package.json` - NPM scripts for easy access

## Usage Examples

### Interactive Chat
```bash
python use_model.py --interactive
```

### Single Prompt
```bash
python use_model.py --prompt "Explain quantum computing in simple terms"
```

### Different Model
```bash
python use_model.py --model "other/model/path" --interactive
```

### GPU Acceleration
```bash
python use_model.py --device cuda --interactive
```

## Troubleshooting

### Common Issues

1. **Out of Memory**: Reduce model size or use CPU mode
2. **Installation Errors**: Check system dependencies and Python version
3. **Model Download Fails**: Check internet connection and disk space
4. **Slow Performance**: Enable GPU acceleration if available

### Getting Help

- Check the console output for specific error messages
- Refer to `MODEL_DOWNLOAD.md` for detailed troubleshooting
- Ensure you have sufficient RAM and storage
- Verify Python and pip versions are compatible

## Alternative Approaches

If you prefer other methods:

1. **Modular MAX**: Use the official Modular platform
2. **Docker**: Run in containerized environment
3. **Hugging Face**: Direct integration with HF ecosystem
4. **API Endpoints**: Deploy as web service

## Next Steps

After setup, you can:

1. **Explore the Model**: Test various prompts and capabilities
2. **Integrate**: Use in your own applications
3. **Fine-tune**: Adapt for specific use cases
4. **Deploy**: Set up as a service for others to use

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the detailed documentation in `MODEL_DOWNLOAD.md`
3. Ensure your system meets the requirements
4. Check that all dependencies are properly installed

---

**Note**: This setup provides local access to the model. For production use, consider using Modular's hosted services or deploying your own infrastructure.
