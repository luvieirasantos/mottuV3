import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  useTheme, 
  Card, 
  Title, 
  Button, 
  TextInput, 
  Text,
  ActivityIndicator 
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useAuth } from '@/src/hooks/useAuth';
import { loginSchema } from '@/src/utils/validators';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const theme = useTheme();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError('');
    
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    card: {
      padding: 24,
      backgroundColor: theme.colors.surface,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.primary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.onSurfaceVariant,
      marginBottom: 32,
    },
    input: {
      marginBottom: 16,
      backgroundColor: theme.colors.surfaceVariant,
    },
    button: {
      marginTop: 16,
      paddingVertical: 8,
    },
    error: {
      color: theme.colors.error,
      textAlign: 'center',
      marginBottom: 16,
    },
    linkContainer: {
      marginTop: 24,
      alignItems: 'center',
    },
    linkText: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Card style={styles.card}>
            <Title style={styles.title}>Mottu</Title>
            <Text style={styles.subtitle}>Pátio Digital</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="E-mail"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!errors.email}
                  style={styles.input}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Senha"
                  mode="outlined"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                  style={styles.input}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              style={styles.button}
            >
              {loading ? <ActivityIndicator color={theme.colors.onPrimary} /> : 'Entrar'}
            </Button>

            <View style={styles.linkContainer}>
              <Link href="/(auth)/cadastro">
                <Text style={styles.linkText}>
                  Não tem conta? Cadastre-se
                </Text>
              </Link>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}