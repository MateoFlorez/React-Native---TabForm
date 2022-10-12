import { StyleSheet, Text, Button, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const users = [
  {
    user: "Mateo",
    rol: "Administrador",
    password: "123456"
  },
  {
    user: "Rachel",
    rol: "Usuario",
    password: "123456"
  }
  
]

const findUser = users.find(user => user)
const findRol = users.find(rol => rol)
const findPassword = users.find(password => password)

function UserScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if (rol == "Administrador") {
      setRol("");
      setUser("");
      setPassword("")
      navigation.navigate('Profile', { user: user })
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.inputs}
        onChangeText={value => setUser(value)}
        value={user}
        placeholder="User"
      />
      <TextInput
        style={styles.inputs}
        onChangeText={value => setRol(value)}
        value={rol}
        placeholder="Rol"
      />
      <TextInput
        style={styles.inputs}
        onChangeText={value => setPassword(value)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
        title="Ingresar"
        //onPress={() => navigation.navigate('Settings')}
        //onPress={validate}
        onPress={() => {
          if (rol === "Administrador" && user.value === users.user && password.value === users.password) {
            setRol("");
            setUser("");
            setPassword("")
            navigation.navigate('Profile', { user: user })
          }
          else{
            alert("Usuario no registrado")
          }
        }}

      />
    </View>
  );
}

function ProfileScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>Perfil: {route.params.user}</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text>Cuentas</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* tabBarStyle: desactiva el menú bottom */}
      <Tab.Screen name="User" component={UserScreen} options={{
        tabBarStyle: { display: "none" }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Bancario' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 5
  }
});
