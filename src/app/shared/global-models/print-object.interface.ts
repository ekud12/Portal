export class PrintObject {
  headerDetailsText1 = 'קוד ספק:';
  headerDetailsText2 = 'שם ספק:';
  headerDetailsValue1: string; // קוד ספק
  headerDetailsValue2: string; // שם ספק

  parentContent: object[]; // מידע על הקודם
  btn1Action = 'הדפס'; // פעולה כפתור הדפסה
  mainHeader: string; // כותרת ראשית : "הנדון"
  isTableContent: boolean; // האם יש טבלה או סיכום/סגירת חשבונית
  lowerContent: any[]; // פרטי ספק ב SAP
  recipient = { greeting: 'לכבוד מאוחדת', address: 'אבן גבירול 124', city: 'תל אביב' }; // נמען
  dialogHeader: string; // כותרת לדך ההדפסה
  displayedColumns: string[]; //  ערכי עמודות לטבלה
  dismap: any[]; //   מיפוי שם עמודה לטקסט
  data: any[]; // מידע לטבלה
  specialData: string[]; // טקסט חופשי במקום טבלה
}
