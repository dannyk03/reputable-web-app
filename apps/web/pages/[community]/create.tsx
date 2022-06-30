import { useToast } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ExperimentForm from '../../containers/Experiments/Form';
import { useApiContext } from '../../providers/ApiContext';
import { getPageTitle } from '../../utils';

const id = 'create-experiment-toast';

export default function CraeteExperimentView() {
  const { user, isLoading } = useApiContext();
  const router = useRouter();
  const toast = useToast();
  const authorized = user?.app_metadata?.isApproved || false;
  useEffect(() => {
    if (!authorized && !isLoading) {
      router.push('/');
      if (!toast.isActive(id))
        toast({
          title: 'Access Denied',
          description:
            'You have to be approved by an admin to create experiments',
          status: 'warning',
          isClosable: true,
          variant: 'top-accent',
        });
    }
  }, [router, toast, user, authorized]);
  if (!authorized) return <></>;
  return (
    <>
      <Head>
        <title>{getPageTitle('Create Experiment')}</title>
      </Head>
      <ExperimentForm />
    </>
  );
}
