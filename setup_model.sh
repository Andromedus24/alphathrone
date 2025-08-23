#!/bin/bash

# Setup script for Nous-Hermes-2-Mistral-DPO/7B model

echo "🚀 Setting up Nous-Hermes-2-Mistral-DPO/7B model environment..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip first."
    exit 1
fi

echo "✅ pip3 found: $(pip3 --version)"

# Create virtual environment
echo ""
echo "📦 Creating virtual environment..."
python3 -m venv .venv

if [ $? -eq 0 ]; then
    echo "✅ Virtual environment created successfully"
else
    echo "❌ Failed to create virtual environment"
    exit 1
fi

# Activate virtual environment
echo ""
echo "🔧 Activating virtual environment..."
source .venv/bin/activate

if [ $? -eq 0 ]; then
    echo "✅ Virtual environment activated"
else
    echo "❌ Failed to activate virtual environment"
    exit 1
fi

# Upgrade pip
echo ""
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo ""
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    echo "💡 You may need to install system dependencies first:"
    echo "   - On Ubuntu/Debian: sudo apt-get install python3-dev build-essential"
    echo "   - On macOS: xcode-select --install"
    echo "   - On Windows: Install Visual Studio Build Tools"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📖 Next steps:"
echo "1. Activate the virtual environment: source .venv/bin/activate"
echo "2. Start interactive chat: python use_model.py --interactive"
echo "3. Or use npm scripts:"
echo "   - npm run use-model (interactive chat)"
echo "   - npm run model-prompt 'Your question here' (single prompt)"
echo ""
echo "⚠️  Important notes:"
echo "- The model requires at least 16GB RAM"
echo "- First run will download the model (~7GB)"
echo "- GPU acceleration is recommended for better performance"
echo ""
echo "🔗 For more information, see MODEL_DOWNLOAD.md"
