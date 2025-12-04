import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createPatient, getPatientById, updatePatient } from '../services/patientService';

export default function PatientForm({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const id = route.params?.id;

  useEffect(() => {
    if (id) load();
  }, [id]);

  async function load() {
    const p = await getPatientById(id);
    if (p) {
      setNome(p.nome);
      setTelefone(p.telefone || '');
      setIdade(String(p.idade || ''));
    }
  }

  async function save() {
    if (!nome.trim()) return Alert.alert('Validação', 'Nome é obrigatório');

    if (id) {
      await updatePatient(id, { nome, telefone, idade: idade ? parseInt(idade) : null });
    } else {
      await createPatient({ nome, telefone, idade: idade ? parseInt(idade) : null });
    }
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Button title="Salvar" onPress={save} />
    </View>
  );
}