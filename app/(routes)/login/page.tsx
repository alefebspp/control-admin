import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { PiClockClockwise, PiClockCountdownFill } from 'react-icons/pi';
import { AuthForm } from '@/components/AuthForm';
import { MovingClock } from '@/components/MovingClock';

export default function Login() {
  return (
    <div className="w-full h-[100vh] flex items-center bg-blue-300 p-10 ">
      <div className="w-full lg:h-[80%] xl:h-full bg-white items-center flex p-5 rounded-br-[60px]">
        <div className="xl:w-[30%] lg:w-[40%] h-[80%]  p-14 bg-white flex flex-col justify-between items-start">
          <MovingClock>
            <h2 className="font-bold lg:text-2xl xl:text-4xl">Entrar</h2>
            <h3 className="lg:text-sm xl:text-lg">Faça login para entrar</h3>
          </MovingClock>
          <AuthForm />
          <div className="w-full flex gap-[2px]">
            <p>Não tem uma conta?</p>
            <Link className="font-bold underline" href="/register">
              Criar
            </Link>
          </div>
        </div>
        <div className="w-[70%] h-full bg-mosaic bg-cover bg-center bg-no-repeat flex flex-col justify-between rounded-tl-[60px] rounded-br-[60px]">
          <div className="w-full h-[40%] p-10 flex justify-start items-start">
            <PiClockCountdownFill className="text-white h-12 w-12" />
          </div>
          <div className="w-full h-[40%] p-10">
            <Accordion type="single" collapsible className="w-[50%] text-white">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl">
                  Controle de horários
                </AccordionTrigger>
                <AccordionContent>
                  Controle simples e otimizado dos horários do colaborador
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl">
                  Gestão e ajustes
                </AccordionTrigger>
                <AccordionContent>
                  Atribue gestores para lidar com ajustes necessários
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl">
                  Estatísticas e análises
                </AccordionTrigger>
                <AccordionContent>
                  Obtenha estatísticas detalhadas dos horários
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
