import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import Redirect from './Redirect';
import { useApiContext } from '../../providers/ApiContext';
import { IUser } from '@reputable/types';

const id = 'restricted-view-toast';

interface RestrictedViewProps {
  /**
   * @param user: Current user object from useApiContext() hook.
   * @returns Should return true if user is authorized to view the children of this HOC.
   */
  condition: (user: IUser) => boolean;
  errorMessage?: string;
  redirectTo?: string;
}

/**
 * An Higher Order Component to encapsulate conditional rendering flow,
 * It will check if current user is authorized to view the children
 * of this component.
 */
export default function Restricted({
  condition,
  errorMessage = 'Can not view this page.',
  redirectTo = '/',
  children,
}: React.PropsWithChildren<RestrictedViewProps>) {
  const toast = useToast();
  const { user, isLoading } = useApiContext();
  const isAuthorized = condition(user);
  useEffect(() => {
    if (!isAuthorized) {
      if (!toast.isActive(id))
        toast({
          title: 'Access Denied',
          description: errorMessage,
          status: 'error',
          isClosable: true,
          variant: 'top-accent',
        });
    }
    () => {
      toast.close(id);
    };
  }, [condition, toast, isLoading, errorMessage, isAuthorized]);
  if (isLoading || !user) return <></>;
  if (!isAuthorized) {
    return <Redirect to={redirectTo}></Redirect>;
  }
  return <>{children}</>;
}
