import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [cep, setCep] = useState('');
  const [info, setInfo] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    regiao:'',
    complemento:'',
    uf: '',
    ddd: '',
  });

  async function buscarCEP() {
    if (cep.length !== 8) {
      alert("Por favor, digite um CEP válido com 8 dígitos.");
      return;
    }
    let r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let dados = await r.json();
    setInfo(dados);
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>

      <Text style={styles.title}>Consulta de CEP</Text>
      <StatusBar style="auto" />
      
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        maxLength={8}
        value={cep}
        onChangeText={setCep}
      />

      <TouchableOpacity style={[styles.botao]} onPress={buscarCEP}>
           <Text style={styles.textoBotao}>Buscar</Text>
       </TouchableOpacity>

      <View style={styles.resultBox}>
        <Text style={styles.resultText}>Rua: {info.logradouro}</Text>
        <Text style={styles.resultText}>Complemento: {info.complemento}</Text>
        <Text style={styles.resultText}>Bairro: {info.bairro}</Text>
        <Text style={styles.resultText}>Cidade: {info.localidade}</Text>
        <Text style={styles.resultText}>Estado: {info.uf}</Text>
        <Text style={styles.resultText}>Regiao: {info.regiao}</Text>
        <Text style={styles.resultText}>DDD: {info.ddd}</Text>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  main:{
    width: 335,
    height: 420,
    backgroundColor:"#f7bac8",
    borderRadius: 10,
    borderColor: "#82636a",
    borderWidth: 2,
    padding: 20,  
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: 290,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  resultBox: {
    width: 290,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 15,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  botao:{
    width: 290,
    height: 34,
    
  },
  textoBotao:{
    color: "white",
    backgroundColor: "#f7d2db",
    justifyContent: 'center',
    fontSize: 16,
    padding: 5,
    borderRadius: 9,
    width: 290,
    height: 34,
    textAlign: "center",
  }
});
