#!/usr/bin/env python3
"""
Script to use the Nous-Hermes-2-Mistral-DPO/7B model with Hugging Face
"""

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import argparse

def load_model(model_name="NousResearch/Nous-Hermes-2-Mistral-7B-DPO", device="auto"):
    """
    Load the model and tokenizer
    """
    print(f"Loading model: {model_name}")
    print("This may take a few minutes on first run...")
    
    # Auto-detect device if not specified
    if device == "auto":
        device = "cuda" if torch.cuda.is_available() else "cpu"
    
    print(f"Using device: {device}")
    
    try:
        # Load tokenizer
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        
        # Load model with appropriate settings for memory efficiency
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16 if device == "cuda" else torch.float32,
            device_map=device,
            low_cpu_mem_usage=True
        )
        
        print("✅ Model loaded successfully!")
        return model, tokenizer
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        print("\n💡 Tips:")
        print("1. Make sure you have enough RAM (at least 16GB recommended)")
        print("2. Consider using a smaller model variant if you have memory issues")
        print("3. Check your internet connection for the first download")
        return None, None

def generate_response(model, tokenizer, prompt, max_length=200, temperature=0.7):
    """
    Generate a response from the model
    """
    try:
        # Format the prompt in ChatML format (as expected by this model)
        formatted_prompt = f"<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant\n"
        
        # Tokenize input
        inputs = tokenizer(formatted_prompt, return_tensors="pt")
        
        # Move to same device as model
        if hasattr(model, 'device'):
            inputs = {k: v.to(model.device) for k, v in inputs.items()}
        
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=max_length,
                temperature=temperature,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id,
                eos_token_id=tokenizer.eos_token_id
            )
        
        # Decode response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract just the assistant's response
        if "<|im_start|>assistant\n" in response:
            response = response.split("<|im_start|>assistant\n")[-1]
        if "<|im_end|>" in response:
            response = response.split("<|im_end|")[0]
        
        return response.strip()
        
    except Exception as e:
        print(f"❌ Error generating response: {e}")
        return None

def interactive_chat(model, tokenizer):
    """
    Start an interactive chat session
    """
    print("\n🤖 Interactive Chat Mode")
    print("Type 'quit' to exit, 'clear' to start a new conversation")
    print("-" * 50)
    
    conversation_history = []
    
    while True:
        try:
            user_input = input("\n👤 You: ").strip()
            
            if user_input.lower() == 'quit':
                print("👋 Goodbye!")
                break
            elif user_input.lower() == 'clear':
                conversation_history = []
                print("🧹 Conversation cleared!")
                continue
            elif not user_input:
                continue
            
            # Build full conversation context
            full_prompt = ""
            for msg in conversation_history:
                if msg['role'] == 'user':
                    full_prompt += f"<|im_start|>user\n{msg['content']}<|im_end|>\n"
                else:
                    full_prompt += f"<|im_start|>assistant\n{msg['content']}<|im_end|>\n"
            
            full_prompt += f"<|im_start|>user\n{user_input}<|im_end|>\n<|im_start|>assistant\n"
            
            print("\n🤖 Assistant is thinking...")
            
            # Generate response
            response = generate_response(model, tokenizer, full_prompt)
            
            if response:
                print(f"🤖 Assistant: {response}")
                
                # Add to conversation history
                conversation_history.append({'role': 'user', 'content': user_input})
                conversation_history.append({'role': 'assistant', 'content': response})
            else:
                print("❌ Failed to generate response")
                
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

def main():
    parser = argparse.ArgumentParser(description="Use Nous-Hermes-2-Mistral-DPO/7B model")
    parser.add_argument("--model", default="NousResearch/Nous-Hermes-2-Mistral-7B-DPO", 
                       help="Model name or path")
    parser.add_argument("--device", default="auto", 
                       help="Device to use (auto, cpu, cuda)")
    parser.add_argument("--prompt", help="Single prompt to generate response for")
    parser.add_argument("--interactive", action="store_true", 
                       help="Start interactive chat mode")
    
    args = parser.parse_args()
    
    # Load model
    model, tokenizer = load_model(args.model, args.device)
    
    if model is None or tokenizer is None:
        return
    
    # Single prompt mode
    if args.prompt:
        print(f"\n📝 Prompt: {args.prompt}")
        response = generate_response(model, tokenizer, args.prompt)
        if response:
            print(f"\n🤖 Response: {response}")
        else:
            print("❌ Failed to generate response")
    
    # Interactive mode
    elif args.interactive:
        interactive_chat(model, tokenizer)
    
    # Default: show usage
    else:
        print("\n📖 Usage Examples:")
        print("1. Single prompt:")
        print(f"   python {__file__} --prompt 'What is artificial intelligence?'")
        print("\n2. Interactive chat:")
        print(f"   python {__file__} --interactive")
        print("\n3. Use different model:")
        print(f"   python {__file__} --model 'other/model/path' --interactive")

if __name__ == "__main__":
    main()
