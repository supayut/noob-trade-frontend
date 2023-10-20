'use client';
import Container from "@mui/material/Container"
import ButtonAppBar from "./ButtonAppBar"
import Box from "@mui/material/Box"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <nav>
      <ButtonAppBar />
      <Container
        maxWidth="lg"
        sx={{
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            paddingTop: '1rem',
            paddingBottom: '1rem',
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Container>
    </nav>
  )
}
