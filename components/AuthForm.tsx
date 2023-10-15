'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { SignInSchema } from '@/lib/schemas'
import { useToast } from '@/components/ui/use-toast'
import { AppError } from '@/lib/AppError'
import { useAuthContext } from '@/context/AuthContext'

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { signIn } = useAuthContext()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema)
  })

  async function handleSignIn({
    email,
    password
  }: z.infer<typeof SignInSchema>) {
    try {
      setIsLoading(true)
      await signIn({ email, password })
    } catch (error) {
      console.log('ERROR:', error)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível fazer login'
      toast({
        title: title,
        description: 'Por favor, tente novamente.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-[40%] ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="w-full h-full py-2 flex justify-around flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            isLoading={isLoading}
            type="submit"
            className="w-full h-[20%]"
          >
            Fazer login
          </Button>
        </form>
      </Form>
    </div>
  )
}
