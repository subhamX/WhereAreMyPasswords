import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MainOptionTile } from '../components/MainOptionTile'
import { Navbar } from '../components/Navbar'
import { WithoutTokenScreen } from '../components/WithoutTokenScreen'
import { WithTokenScreen } from '../components/WithTokenScreen'
import bcrypt from 'bcryptjs'
import { KEY_MAIN_PASSWORD_SHA } from '../config/keys'
import { toast } from 'react-toastify';
import { useOfflineCacheService } from '../Hooks/useOfflineCacheService'


export async function getStaticProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const Home: NextPage = () => {
  const {token, setToken}=useOfflineCacheService()
  const [currentFilterText, setCurrentFilterText] = useState("");
  const [tokenSHA, setTokenSHA] = useState("");


  useEffect(() => {
    const val = localStorage.getItem(KEY_MAIN_PASSWORD_SHA)
    setTokenSHA(val ?? "")
  }, [])

  async function digestMessage(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));   
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }


  const checkIfTokenMatches = () => {

  }

  const handleSubmit = async (potentialMainPassword: string) => {
    const passwordSHA=await digestMessage(potentialMainPassword)

    if (tokenSHA) {
      // check if the potentialMainPassword matches the tokenSHA
      if(passwordSHA===tokenSHA){
        setToken(potentialMainPassword)
      }else{
        toast.error("Wrong password. 😭")
        return;
      }
    } else {
      // set the tokenSHA to the potentialMainPassword
      setTokenSHA(passwordSHA)
      setToken(potentialMainPassword)
      localStorage.setItem(KEY_MAIN_PASSWORD_SHA, passwordSHA)
    }
    toast.success("successfully unlocked the vault. 🎉")
  }

  return (
    <div>
      <Head>
        <title>WhereAreMyPassword</title>
        <meta name="description" content="A browser based fully offline progressive web app to store your passwords and secure notes!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>

      <Navbar
        showSearchBar={token !== ""}
        currentFilterText={currentFilterText}
        setCurrentFilterText={setCurrentFilterText}
      />

      {token ? <WithTokenScreen /> : <WithoutTokenScreen handleSubmit={handleSubmit} isNewUser={tokenSHA === ""} />}

    </div>
  )
}

export default Home
