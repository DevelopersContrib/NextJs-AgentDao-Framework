'use client'

import Script from 'next/script';

function Ai() {
  return (
    <>
      <div className="ai-script pb-custom" style={{ width: '800px', margin: '0 auto' }}></div>
      <Script src="https://tools.contrib.com/cwidget/ai?container=ai-script" />

      <style>{`
        .ai-script {
          width: 800px;
          margin: 0 auto;
        }
        .pb-\[88px\] {
          padding-bottom: 30px;
        }
        #m0ojcl6w48wku {
          display: none;
        }
      `}</style>
    </>
  );
}

export default Ai;
