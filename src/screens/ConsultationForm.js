import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createConsultation, getConsultationById, updateConsultation } from '../services/consultationService';

export default function ConsultationForm({ navigation, route }) {
  const paciente = route.params?.paciente;
  const id = route.params?.id;
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (id) load();
  }, [id]);

  async function load() {
    const c = await getConsultationById(id);
    if (c) {
      setData(c.data);
      setDescricao(c.descricao);
    }
  }

  async function save() {
    if (!data.trim()) return Alert.alert('Validação', 'Data é obrigatória');
    if (id) {
      await updateConsultation(id, { data, descricao });
    } else {
      await createConsultation({ paciente_id: paciente.id, data, descricao });
    }
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Data (YYYY-MM-DD ou livre)" value={data} onChangeText={setData} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={{ borderWidth: 1, padding: 8, marginBottom: 8, height: 120 }} multiline />
      <Button title="Salvar" onPress={save} />
    </View>
  );
}