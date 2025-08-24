    };
    
    this.smartContracts.set(contract.id, contract);
    return contract;
  }
}

// Server startup
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Advanced Quantum Chaos Simulator Server running on port ${PORT}`);
  console.log('🌟 Ready for quantum experiments and chaos simulations!');
});
