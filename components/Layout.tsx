import Container from "@mui/material/Container"
import ButtonAppBar from "./ButtonAppBar"
import Box from "@mui/material/Box"
import Head from "next/head"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Noob Trader</title>
        <meta name="description" content="Noob Trader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <nav>
        <ButtonAppBar />
        <Container
          maxWidth="lg"
          sx={{
            boxShadow: 2,
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
    </>
  )
}
