import * as z from 'zod';
import { customErrorMap } from './utils';

export const SignInSchema = z.object({
  email: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um email')
    })
    .email({
      message: 'Digite um email válido.'
    }),
  password: z.string({
    errorMap: (issue, ctx) => customErrorMap('Digite uma senha')
  })
});

export const createCompanySchema = z.object({
  name: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um nome')
    })
    .min(1),
  email: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um email')
    })
    .email({
      message: 'Digite um email válido.'
    })
});

export const createCollaboratorSchema = z.object({
  name: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um nome')
    })
    .min(1),
  surname: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um sobrenome')
    })
    .min(1),
  email: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um email')
    })
    .email({
      message: 'Digite um email válido.'
    }),
  password: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite uma senha')
    })
    .min(1),
  shift_start: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um horário de entrada')
    })
    .min(4),
  interval_start: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um início de intervalo')
    })
    .min(4),
  interval_end: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um fim de intervalo')
    })
    .min(4),
  shift_end: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um horário de saída')
    })
    .min(4)
});

export const updateCollaboratorSchema = z.object({
  name: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um nome')
    })
    .min(1),
  surname: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um sobrenome')
    })
    .min(1),
  email: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um email')
    })
    .email({
      message: 'Digite um email válido.'
    }),
  shift_start: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um horário de entrada')
    })
    .min(4),
  interval_start: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um início de intervalo')
    })
    .min(4),
  interval_end: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um fim de intervalo')
    })
    .min(4),
  shift_end: z
    .string({
      errorMap: (issue, ctx) => customErrorMap('Digite um horário de saída')
    })
    .min(4)
});
