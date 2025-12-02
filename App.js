import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getDBConnection, createTable } from './database';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [db, setDb] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [clientes, setClientes] = useState([]);

  // Conectando ao banco ao iniciar
  useEffect(() => {
    const initDB = async () => {
      const dbConn = await getDBConnection();
      setDb(dbConn);

      await createTable(dbConn);
      listarClientes(dbConn);
    };
    initDB();
  }, []);

  // CREATE
  const adicionarCliente = () => {
    if (!nome) return;

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO clientes (nome, email) VALUES (?, ?);",
        [nome, email],
        () => {
          listarClientes(db);
          setNome("");
          setEmail("");
        }
      );
    });
  };

  // READ
  const listarClientes = (db) => {
    db.transaction((tx) => {

      tx.executeSql(
        "SELECT * FROM clientes;",
        [],
        (_, { rows }) => {
          setClientes(rows._array);
        }
      );
    });
  };

  // UPDATE
  const atualizarCliente = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE clientes SET nome=?, email=? WHERE id=?;",
        [nome, email, id],
        () => {
          listarClientes(db);
          setNome("");
          setEmail("");
        }
      );
    });
  };

  // DELETE

  const deletarCliente = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM clientes WHERE id=?;",
        [id],
        () => listarClientes(db)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cad. Clínica</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}

      />

      <Button title="Adicionar Cliente" onPress={adicionarCliente} />

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>{item.nome} - {item.email}</Text>

            <Button
              title="Editar"
              onPress={() => {
                setNome(item.nome);
                setEmail(item.email);
                atualizarCliente(item.id);
              }}
            />

            <Button
              title="Excluir"
              color="red"
              onPress={() => deletarCliente(item.id)}
            />
          </View>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 5

  },
  texto: {
    fontSize: 16
  }
});