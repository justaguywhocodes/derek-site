import React, { useState } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const PGP_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
mQINBGmWW+cBEAC2bjJFbVVjPT1UVACHlrjMVg2RxFOwKHzwKD/P4rQHBrqHLUo/
k3IiEC0cNpyyvlnPyfNYGtBT8I0dOeTqF8W7hF9hpvUimbiRb0r6e9n+mfgWwF4s
RfuCYkf0I3rIT8nCAaeTUz76HENcxXGoJKUAFtVg2kN/ZHOCEVEFUmMKb4m5yocq
6tWYhbJpMdcOSSoCZxZqomUL3i33BW07OXMlrBvjlvsXDFbDFBHjHgeSVhAcGHmJ
nKX5km4Mx9SKFXEgC+U99LC08sT4XRe1MguqMNMD102cjw0I1d1mGw9hNrQjY2Bz
XaNR2uCvunPuRz1MWeg0OX40v2nB+nCw8Dbgg99KH7rLyj966nBTZ9AzEUfR6fw6
5fIfK20k10hkejP0eNwKy2QrvjOteLTCrGsRk6Zcs5NVkfpkuo9rN0w3DErcoiet
OQ0Wb47emcBgMqZt+zJtA5O+C6dZ++3wr2v+CAlAttKXMrJyHK0DgsJk9YjYma+D
S+cdF9ubfkoeV9OblLOuHjt0jiyPQYqd4QNlurKI9VPCHJJCITlusVSOob6uDuaO
q8453fk5Z+2z+0WYXKYTKI02SVwTvmbWgSseLlMQAcwmBzqnMx9Xz5Kjr9dRgQpB
nL2hbWHtYMlLdiAGg6KOFXx/yN+9Bu5mH9I+jU7eyAuHgk1zHqkkUR8InQARAQAB
tCBEZXJlayBNYXJ0aW4gPG1lcmVrZGFydGluQHBtLm1lPokCTgQTAQoAOBYhBMq9
7uX3YTVhPNqHD4o/hnHqZCZYBQJpllvnAhsDBQsJCAcCBhUKCQgLAgQWAgMBAh4B
AheAAAoJEIo/hnHqZCZY364QAIunIALuVaX8dl4yS9L+LY2KBrznnvY6uuep8VMy
+K1VVE1WWLsssH1AZlDbYxF7uVlWfIUYCDdxeCLl9vLCQs2GorKJ+lTaOqsG9tZA
D33s3dDfj9arb3e2+41wkUj/UWLD99OidLgPdfmdIvgHfM1FTP/GYqYyWh+4l3kH
I/I3TIScRn1hYpIne2q/EARmSNGwZ13awN25+vAOXTGJS0h8mlIRvX5d1FMHMi02
YzD4ccKvoddZA3sGRSYLMMmmHgcciWM20EiWSBPWmtWUyQVbFZ77+gi0kHZqZghx
CR6uyTFWpbr52u2RKp5gE1Jc2tSuWnWsu9//Z4vcE1Bo7sJp83JNzDPIvMZe4bvm
xwcuiCywGL8U9hTzR1km241fnPhgj1FUwOb7HEbsmObhuo5pJZd6GEQDJkUlpikl
Oea6FlowEe0eWhaMkTLB9TRwmYeruVSQwifjWcKeUIzidHD0+Cjg2/9Wm07Pg08T
PsPSUlj/r2FKyxtqyB6NFjLmhacc1b3yt9+zY012oKI9pGHbZTVtBP/oTaajidJ1
0S/diPzMZAtaL68SPNinBv3qlxw5dzMtOwXSTzjSTtO+KennUNIIVifwTbj59Oax
aZLL7WFBy2h841Vh1d+MAGtCg+XeKkOIfzNcMNU/pC7rb4KXvqBbeLKmyY43DTWZ
7X9nuQINBGmWW+cBEACVLxgNX1JFOGQUM/8gkBVGIvvXFPvxP2GsEIMMQaKH1HcD
RAtoAXy6yoq5VE9U1o4IIzIWJ32KB0xdOsL8dklWpwxzT9wowntMdzE//3ntHVqg
P1vT0QRT7HP6XL5sc8UiSsYrR9QwobBRwAxQVoJsDfxIfaqNQxfsEVtyifwQjeX9
Dlf/zjrQ8uPyanq0KaJ9/G0EAZYHCxLMRJnJcRVa7xO7wL7tBuK8NeRcuFnaJR7P
tINdVqyIt53K3RtvBmnAlnsit+YLVwh2amAOBf+MLULHOABr/ZrBM7nNClD84m5k
n95zvBi4C1EnE9MBGFP3Jb7E1MGgeShwl5jgd5EnH6Aiva2ZyyrYZTGu52c75YHf
6UEbEZBvY2PG4BqbeTJT0WzSGfa1RiBFpnWt2iCyRHYxELuVRHWHu1JFFlgnrwvm
z38n8rbItjSnUSFOagAjf0Vl3gjqo6tDH0HjxVYAAySS7kGbyRevlFRVsj9Vhmos
Pl4iXCpL1i8SbNNsW6VPpSfueRpa9KSZTCnrtaZ27Psb0C4wSRsxUH7HWHjY25MO
c8usUK2UjdPrIoS4tflZ1fwGnsDnf23jqAIGMF0iI2+9lnzhc/SiF8Hv4pDniS6S
Oke+WiTfoiNp37OIIUbUfOqU+idhCvYhDRn8XWd4qVQBhVHYghF+0AkFJ/00wwAR
AQABiQI2BBgBCgAgFiEEyr3u5fdhNWE82ocPij+GcepkJlgFAmmWW+cCGwwACgkQ
ij+GcepkJlijUg//U3AjGf8snGh6CfvXD41syQQ7U9U2Ipczz1kmfdwk/opiGQWN
iVjqhJ6koDdCjP58ElRa01R2a09RzmK7+KYfUFqNIH5b9txeZVhQWzYGeeLwIWib
VF51puAf5vlyeUzMvfGx5p9OSlKW0j/xK69ykq8inec8pGhxfihiPOhnDcc7tV9v
nT82Rbc272gq+plCGfychvW9JaaN13H+Dgq2zpelrXJ9c8r5PVIHXx+ulT0kyA8j
ZGeN1305pag8S+fE9H7Al+dtKm8Cmo/Y9O/A6Pexs5IFUm4GEW/MFMTJzCfUwlTP
BT0Wt/An5lFQxVhaAvLATXCivB5PSh35NiJNyk2MDZfaSyJj4FSlM5eNkFNPzVZd
epyIzF6TOXu8Q7ZhJl/R4FVu4tA2aTmT/9azn/ap5mduxQ8b1esQPL6GtSv63KnM
p0PWMDfvhIBHdj0Wt6E5V8z/kPIN6C1y279Ijm7EkooRDejVkVpKU/XuZIHpgGAA
HtO122dN0hCg2s2+qX7Gu8dbmYkxr8v9a1HBIXUtD9RM/lcvX+KoZsl/S/d9obN2
ib2Y/hV7w8oq3fdoMbmIhsSvcOBMc9z/rZh7yzpOguFmqTkn+yeujFMq7Sp8eJjE
qIevL2QVWMlmBjbyX9dUaLEyfimMlgfhme/exQ++ZQiv4/vk1a6hX6CINlo=
=PYxZ
-----END PGP PUBLIC KEY BLOCK-----`

const FINGERPRINT = "CABD EEE5 F761 3561 3CDA  870F 8A3F 8671 EA64 2658"

const PgpPage = () => {
  const [copied, setCopied] = useState(false)

  const copyKey = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(PGP_KEY).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <Layout>
      <div className="post-header">
        <div className="section-label">Security</div>
        <h1>PGP Public Key</h1>
      </div>

      <div className="post-content">
        <p>
          Use this key to send me encrypted messages or verify my signatures.
          You can also find this key on{" "}
          <a
            href="https://keys.openpgp.org/search?q=CABDEEE5F76135613CDA870F8A3F8671EA642658"
            target="_blank"
            rel="noopener noreferrer"
          >
            keys.openpgp.org
          </a>
          .
        </p>

        <h2>Fingerprint</h2>
        <p>
          <code className="pgp-fingerprint">{FINGERPRINT}</code>
        </p>

        <h2>Public Key</h2>
        <div className="pgp-key-wrapper">
          <button className="pgp-copy-btn" onClick={copyKey}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre className="pgp-key-block">{PGP_KEY}</pre>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="PGP Public Key" />

export default PgpPage
