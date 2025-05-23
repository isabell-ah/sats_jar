import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/UserAuthContext';
import { ArrowLeft, LogIn, User, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Use Vite's environment variable syntax
const API_URL =
  import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000/api';

interface ChildLoginProps {
  onBack: () => void;
}

const ChildLogin: React.FC<ChildLoginProps> = ({ onBack }) => {
  const [jarId, setJarId] = useState('');
  const [childPin, setChildPin] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChildLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!jarId || !childPin) {
        toast({
          variant: 'destructive',
          title: 'Oops!',
          description: 'Please fill in both Jar ID and PIN',
        });
        return;
      }

      console.log('Attempting child login with:', { jarId, childPin });

      const response = await fetch(`${API_URL}/auth/child-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jarId, childPin }),
      });

      console.log('Child login response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Child login error:', errorData);
        throw new Error(errorData.error || 'Login failed');
      }

      const result = await response.json();
      console.log('Child login result:', result);

      if (!result.token || !result.user) {
        throw new Error('Invalid response: Missing token or user data');
      }

      login(result.token, result.user);
      console.log('Login called with:', {
        token: result.token.substring(0, 15) + '...',
        user: result.user,
      });

      // Navigate to payment page
      navigate('/payment/lightning');

      toast({
        title: "🎉 Yay! You're in!",
        description: `Welcome back, ${result.user.name}! Ready to save?`,
      });
    } catch (error: any) {
      console.error('Child login failed:', error.message);
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong',
        description:
          error.message || 'Your Jar ID or PIN might be incorrect. Try again!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4 p-4 animate-fade-in'>
      <Button variant='ghost' onClick={onBack} className='mb-4'>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>

      <Card className='shadow-lg border-2 border-blue-300 overflow-hidden'>
        <CardHeader className='bg-gradient-to-r from-blue-400 to-purple-500 text-white'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-xl flex items-center'>
              <div className='bg-white text-blue-500 p-1 rounded-full mr-2'>
                <User className='h-5 w-5' />
              </div>
              Kid's Login Zone
            </CardTitle>
            <div className='flex space-x-1'>
              {[1, 2, 3].map((star) => (
                <div
                  key={star}
                  className='text-yellow-300 text-xl animate-bounce'
                  style={{ animationDelay: `${star * 0.2}s` }}
                >
                  ★
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-6 bg-gradient-to-b from-blue-50 to-white'>
          <div className='text-center mb-4'>
            <h3 className='text-blue-600 font-bold text-lg'>Hello, Saver!</h3>
            <p className='text-sm text-blue-500'>
              Log in to see your savings jar
            </p>
          </div>

          <form onSubmit={handleChildLogin} className='space-y-4'>
            <div className='space-y-2 bg-white p-3 rounded-lg border border-blue-200'>
              <label
                htmlFor='jar-id'
                className='text-sm font-medium flex items-center text-blue-700'
              >
                <User className='h-4 w-4 mr-2 text-blue-600' />
                Your Jar ID
              </label>
              <Input
                id='jar-id'
                value={jarId}
                onChange={(e) => setJarId(e.target.value)}
                placeholder='Enter your Jar ID here'
                required
                className='border-blue-200 focus:border-blue-500'
              />
            </div>

            <div className='space-y-2 bg-white p-3 rounded-lg border border-blue-200'>
              <label
                htmlFor='child-pin'
                className='text-sm font-medium flex items-center text-blue-700'
              >
                <Key className='h-4 w-4 mr-2 text-blue-600' />
                Your Secret PIN
              </label>
              <Input
                id='child-pin'
                type='password'
                value={childPin}
                onChange={(e) => setChildPin(e.target.value)}
                placeholder='Enter your PIN here'
                required
                className='border-blue-200 focus:border-blue-500'
              />
            </div>

            <div className='pt-4'>
              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg font-bold py-6'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className='loading mr-2'></span>
                    Opening your jar...
                  </>
                ) : (
                  <>
                    <LogIn className='mr-2 h-5 w-5' />
                    Let's Go!
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className='flex justify-center mt-4 space-x-2'>
            {['🚀', '💰', '🎮', '🎯'].map((emoji, i) => (
              <div
                key={i}
                className='text-xl animate-bounce'
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildLogin;
