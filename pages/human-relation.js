import React from 'react'

const HumanRelation = () => (
  <div>
    <div className='hero'>
      <h1 className='title'>Test</h1>
    </div>

    <div className='hero'>
      <h1 className='title'>Test 2</h1>
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