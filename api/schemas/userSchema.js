import z from 'zod'

const userSchema = z.object({
  names1: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  names2: z.string(),
  names3: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  names4: z.string(),
  tel: z.string(),
  email: z.string(),
  documen: z.number()
})

const userClientSchema = z.object({
  nombre1: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  nombre2: z.string(),
  apellido1: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  apellido2: z.string(),
  telefono: z.string(),
  correo: z.string(),
  cedula: z.number()
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}

export function validateClientUser (object) {
  return userClientSchema.safeParse(object)
}
