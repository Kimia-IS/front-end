import React from 'react'
import Head from 'next/head'

const HumanRelation = () => (
  <div>
    <Head>
      <title>Human Relations</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <div className='hero'>
      <h1 className='title'>Test</h1>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
        text-align: center;
      }
    `}</style>
  </div>
)

export default HumanRelation