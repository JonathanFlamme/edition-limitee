import { jost } from '@/src/utils/font';
import BnetIcon from '../../../assets/icons/battlenet.svg';
import { signIn } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/src/components/ui/credenza';
import { Button } from '../ui/button';

export default function RedirectBnet() {
  const handleSignIn = async () => {
    toast.loading('Chargement en cours, veuillez patienter');
    signIn('battlenet');
  };
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className="mt-4 mr-2 md:mr-0 md:mt-6" variant="bnet">
          <BnetIcon className="text-2xl md:text-xl md:mr-2 text-white" />
          <span className="hidden md:text-lg md:block">Battle.net</span>
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className={`${jost.className}`}>
        <CredenzaHeader>
          <CredenzaTitle className="text-xl">Connexion avec Battle.net</CredenzaTitle>
          <CredenzaDescription>
            Vos données restent sécurisées et ne seront pas conservées par Édition Limitée.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <p>Vous allez être redirigé vers Battle.net pour vous connecter de manière sécurisée.</p>
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="bnet" onClick={() => handleSignIn()}>
            <BnetIcon className="text-xl mr-2 text-white" />
            Battle.net
          </Button>
          <CredenzaClose asChild>
            <Button variant="outline">Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
