import { SQLiteProvider } from "expo-sqlite";
import initializeDatabase from "./src/database/init";
import Routes from "./src/Routes";

export default function App() {
  return (
    <SQLiteProvider databaseName="clinica.db" onInit={initializeDatabase}>
      <Routes />
    </SQLiteProvider>
  );
}