import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {router} from 'expo-router';
interface FormState {
  username:string;
  number:string;
  email: string;
  password: string;
}
type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
export default function SignIn() {
  const [form, setForm] = useState<FormState>({username:'',number:'', email: '', password: '' });
const naviga = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                resizeMode="contain"
                style={styles.headerImg}
                source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }}
              />
              <Text style={styles.title}>
                Sign in to 
              </Text> 
               <Text style={styles.title}>
              <Text style={{ color: '#075eec' }}>MARKY TICKET</Text> 
              </Text>
              <Text style={styles.subtitle}>Your Béjaïa travel companion</Text>
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={(username) => setForm({ ...form, username })}
                  placeholder="abdelhakim"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.username}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>phone number</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={(number) => setForm({ ...form, number })}
                  placeholder="0555 55 55 55"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.number}
                />
              </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={(email) => setForm({ ...form, email })}
                  placeholder="abdelhakim@example.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.email}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(password) => setForm({ ...form, password })}
                  placeholder="*****"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
              </View>
              <View style={styles.formAction}>
                <TouchableOpacity onPress={() => {
                  // handle onPress
                }}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => {
                // handle link
              }}>
                <Text style={styles.formLink}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            router.push('/');
          }}>
            <Text style={styles.formFooter}>
              already have an account !{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
    
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
exports.default = SignIn;