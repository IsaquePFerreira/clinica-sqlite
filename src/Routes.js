import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientsList from "./screens/PatientsList";
import PatientForm from "./screens/PatientForm";
import ConsultationsList from "./screens/ConsultationsList";
import ConsultationForm from "./screens/ConsultationForm";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
