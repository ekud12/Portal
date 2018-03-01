export const options = {
  hideRequired: false,
  floatLabel: 'never',
  loginButtonName: 'כניסה',
  loginButtonValidating: 'מאמת...',
  loginButtonLink: 'dash',
  passwordRules: '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$',
  usernameRules: '^(?=.*[A-Za-z])(?=.*[0-9]).*$',
  success_msg: 'התחברות הצליחה! הנך מועבר...',
  support_phone: 'תמיכה: 5443*'
};

export const forms = [
  {
    icon: 'person',
    name: 'שם משתמש',
    type: 'text',
    controller: '_usernameControl'
  },
  {
    icon: 'lock',
    name: 'סיסמא',
    type: 'password',
    controller: '_passwordControl'
  }
];

export const errors = {
  required: '.אנא הכנס נתונים חסרים',
  minlength: 'נתון קצר מדי.',
  pattern: 'ערך לא חוקי.'
};
