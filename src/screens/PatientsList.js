import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getAllPatients, deletePatient } from '../services/patientService';

export default function PatientsList({ navigation }) {
  const [patients, setPatients] = useState([]);

  async function load() {
    const list = await getAllPatients();
    setPatients(list);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation]);

  function confirmDelete(id) {
    Alert.alert('Confirmar', 'Deseja excluir este paciente (e suas consultas)?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await deletePatient(id); load(); } }
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        style={{ backgroundColor: '#2d89ef', padding: 12, borderRadius: 6, marginBottom: 12 }}
        onPress={() => navigation.navigate('PatientForm')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Novo Paciente</Text>
      </TouchableOpacity>

      <FlatList
        data={patients}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontSize: 16 }}>{item.nome} ({item.idade} anos)</Text>
            <Text>{item.telefone}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity onPress={() => navigation.navigate('PatientForm', { id: item.id })} style={{ marginRight: 12 }}>
                <Text style={{ color: '#2d89ef' }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(item.id)} style={{ marginRight: 12 }}>
                <Text style={{ color: 'red' }}>Excluir</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Consultas', { paciente: item })}>
                <Text style={{ color: '#333' }}>Consultas</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}