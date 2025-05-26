
import React, { useState } from 'react';
import { LogIn, User, Phone, Key, UserPlus } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { GlassWater } from 'lucide-react'; // Top of file
import save from '../assets/btc.png';


const API_URL = 'http://localhost:3000/api';

interface LoginFormProps {
  onRegister?: () => void;
  onChildLogin?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onRegister, onChildLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const [apiStatus, setApiStatus] = useState<string>(
    'Checking API connection...'
  );
  const navigate = useNavigate();

  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/health`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        });

        if (response.ok) {
          setApiStatus('API connected successfully');
        } else {
          setApiStatus(
            `API connection failed: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error('API connection check failed:', error);
        setApiStatus(`API connection error: ${error.message}`);
      }
    };

    checkApiConnection();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    if (!phoneNumber || !pin) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please enter both your phone number and PIN.',
      });
      setLoading(false);
      return;
    }

    try {
      if (!phoneNumber || !pin) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please fill in all fields',
        });
        setLoading(false);
        return;
      }

      console.log(`Attempting to connect to ${API_URL}/auth/login`);


    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, pin }),

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          pin,
        }),
        mode: 'cors',

      });

      console.log('Login response status:', response.status);

      const result = await response.json();

      console.log('Login response:', result);

      if (!response.ok) {
        throw new Error(
          result.error || `Login failed with status: ${response.status}`
        );
      }

      // Use the auth context to log in

      login(result.token, result.user);

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${result.user.name || 'User'}!`,
      });

      navigate('/');
    } catch (error: any) {
      console.error('Login error details:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'Invalid phone number or PIN',
      });
    } finally {
      setLoading(false);
    }
  };

  return (

<div className="">
  <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

    {/* Left Side: Form Section */}
    <div className="w-full">
      {/* Logo & Tagline */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-[#2263f9]">
          🐷 Sats Jar
        </div>
        <p className="text-sm text-gray-500">Welcome back, Parent</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="text-sm font-medium px-4 text-gray-700 flex items-center gap-1 mb-1">
            <Phone className="h-4 w-4 text-[#FF6B8B]" /> Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+254712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-10/12 border border-gray-300 rounded-xl px-4 py-2"
          />
        </div>

        {/* PIN Input */}
        <div>
          <label htmlFor="pin" className="text-sm px-4 font-medium text-gray-700 flex items-center gap-1 mb-1">
            <Key className="h-4 w-4 text-[#FF6B8B]" /> PIN
          </label>
          <Input
            id="pin"
            type="password"
            placeholder="Enter your PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-10/12 border border-gray-300 rounded-xl px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#F7931A] hover:bg-[#FFB347] text-white font-bold py-2 rounded-xl"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Logging in...</span>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Login as Parent
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="relative text-center my-3">
          <span className="absolute inset-0 border-t border-gray-300 top-1/2"></span>
          <span className="relative px-3 text-sm bg-white text-gray-400">or</span>
        </div>

        {/* Child Login Button */}
        <Button
          type="button"
          variant="outline"
          onClick={onChildLogin}
          className="w-full flex items-center justify-center gap-2 border border-[#FF6B8B] text-[#FF6B8B] hover:bg-pink-50 rounded-xl py-2"
        >
          <User className="h-4 w-4" />
          Child Login
          <span className="text-xs bg-pink-100 px-2 py-0.5 rounded-full">For Kids</span>
        </Button>

        {/* Register Button */}
        <Button
          type="button"
          variant="link"
          onClick={onRegister}
          className="w-full text-sm text-[#F7931A] hover:text-[#FFB347] flex items-center justify-center"
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Register New Account
        </Button>
      </form>
    </div>

</div></div>




    <Card className='w-full max-w-md mx-auto shadow-lg'>
      <CardHeader className='bg-gradient-to-r from-amber-500 to-orange-500 text-white'>
        <CardTitle className='text-xl flex items-center'>
          <User className='mr-2 h-5 w-5' />
          Parent Login
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div className='space-y-2'>
            <label
              htmlFor='phone'
              className='text-sm font-medium flex items-center'
            >
              <Phone className='h-4 w-4 mr-2 text-amber-600' />
              Phone Number
            </label>
            <Input
              id='phone'
              type='text'
              placeholder='+254712345678'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className='border-amber-200 focus:border-amber-500'
            />
            <p className='text-xs text-muted-foreground'>
              Enter the phone number registered with your account
            </p>
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='pin'
              className='text-sm font-medium flex items-center'
            >
              <Key className='h-4 w-4 mr-2 text-amber-600' />
              PIN
            </label>
            <Input
              id='pin'
              type='password'
              placeholder='Enter your PIN'
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className='border-amber-200 focus:border-amber-500'
            />
          </div>

          <div className='text-sm text-gray-500 mb-4'>{apiStatus}</div>

          <div className='pt-4'>
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='loading mr-2'></span>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className='mr-2 h-4 w-4' />
                  Login as Parent
                </>
              )}
            </Button>
          </div>

          <div className='flex flex-col space-y-2 mt-4 pt-4 border-t'>
            <Button
              type='button'
              variant='outline'
              onClick={onChildLogin}
              className='w-full border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all'
            >
              <div className='flex items-center justify-center w-full'>
                <div className='bg-blue-500 text-white p-1 rounded-full mr-2'>
                  <User className='h-4 w-4' />
                </div>
                <span>Child Login</span>
                <span className='ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full'>
                  For Kids
                </span>
              </div>
            </Button>

            <Button
              type='button'
              variant='link'
              onClick={onRegister}
              className='w-full text-green-600 hover:text-green-700'
            >
              <UserPlus className='mr-2 h-4 w-4' />
              Register New Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>

  );
  
};

export default LoginForm;
