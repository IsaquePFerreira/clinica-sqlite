import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getConsultationsByPatient, deleteConsultation } from '../services/consultationService';

export default function ConsultationsList({ navigation, route }) {
  const paciente = route.params?.paciente;
  const [consultas, setConsultas] = useState([]);

  async function load() {
    if (!paciente) return;
    const list = await getConsultationsByPatient(paciente.id);
    setConsultas(list);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation, paciente]);

  function confirmDelete(id) {
    Alert.alert('Confirmar', 'Excluir consulta?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Excluir', 
        style: 'destructive', 
        onPress: async () => { 
          await deleteConsultation(id); 
          load(); 
        } 
      }
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      
      {/* BOTÃO DE NOVA CONSULTA — CORRIGIDO */}
      <TouchableOpacity 
        style={{ backgroundColor: '#2d89ef', padding: 12, borderRadius: 6, marginBottom: 12 }} 
        onPress={() => navigation.navigate('ConsultationForm', { paciente })}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Nova Consulta para {paciente?.nome}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={consultas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.data}</Text>
            <Text>{item.descricao}</Text>

            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              
              {/* BOTÃO EDITAR — CORRIGIDO */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('ConsultationForm', { paciente, id: item.id })} 
                style={{ marginRight: 12 }}
              >
                <Text style={{ color: '#2d89ef' }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Text style={{ color: 'red' }}>Excluir</Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      />
    </View>
  );
}
