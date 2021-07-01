const passwordResethtml = (to, name, url) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Reset Password</title>
  </head>

  <body>
  <p>
  Hello ${name} ! Click this link to reset ur password ${url}
  </p>
  <br>
  Happy Cooking 
  </br>
  </body>
  
  </html>
  `
}

export default passwordResethtml
