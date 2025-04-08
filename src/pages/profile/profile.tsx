import { ProfileUI } from '@ui-pages';
import {
  FC,
  SyntheticEvent,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { updateUserDetails } from '../../services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const initialFormState = useMemo(
    () => ({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    }),
    [user]
  );

  const [formValue, setFormValue] = useState(initialFormState);

  useEffect(() => {
    setFormValue(initialFormState);
  }, [initialFormState]);

  const isFormChanged = useMemo(
    () =>
      JSON.stringify({ name: formValue.name, email: formValue.email }) !==
        JSON.stringify({ name: user?.name || '', email: user?.email || '' }) ||
      !!formValue.password,
    [formValue, user]
  );

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (!isFormChanged) return;
      dispatch(updateUserDetails(formValue));
      formValue.password && setFormValue((prev) => ({ ...prev, password: '' }));
    },
    [dispatch, formValue, isFormChanged]
  );

  const handleCancel = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setFormValue(initialFormState);
    },
    [initialFormState]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValue((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
