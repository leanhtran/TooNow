export const getUserNameVoximplant = email => {
  if (!email) return
  return email.split('@')[0] + '@toonow.toonow'
}

export const PASSWORD_VOXIMPLANT = '123123'
