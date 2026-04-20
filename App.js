import { SafeAreaView } from "react-native";
import { ProductCatalog } from "./src/features/products/pages/ProductCatalog";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductCatalog/>
    </SafeAreaView>
  );
}