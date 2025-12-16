import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import PatientsList from "./screens/PatientsList";
import PatientForm from "./screens/PatientForm";
import ConsultationsList from "./screens/ConsultationsList";
import ConsultationForm from "./screens/ConsultationForm";
import Login from "./screens/Login";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="PatientsList"
              component={PatientsList}
              options={{ title: "Clinica SQLite - Pacientes" }}
            />

            <Stack.Screen
              name="PatientForm"
              component={PatientForm}
              options={{ title: "Cadastro de Paciente" }}
            />

            <Stack.Screen
              name="Consultas"
              component={ConsultationsList}
              options={{ title: "Clinica SQLite - Consultas" }}
            />

            <Stack.Screen
              name="ConsultationForm"
              component={ConsultationForm}
              options={{ title: "Nova Consulta" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Registrar" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
