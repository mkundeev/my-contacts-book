import RegistrationForm from 'components/RegistrationForm';
import Container from 'components/Container';
import VerificationEmail from 'components/VerificationEmail';

export default function AuthorizationPage() {
  return (
    <Container>
      <RegistrationForm />
      <VerificationEmail />
    </Container>
  );
}
