import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Проверяем наличие обязательных переменных окружения
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Не настроены почтовые переменные окружения');
    }

    // Получаем данные из формы
    const { name, phone } = await request.json();

    // Валидация данных
    if (!name || !phone) {
      throw new Error('Имя и телефон обязательны для заполнения');
    }

    // Настраиваем SMTP транспортер для Яндекс
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'yandex',
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true, // Для продакшена должно быть true
      },
    });

    // Проверяем подключение к SMTP
    await transporter
      .verify()
      .then(() => {})
      .catch((error) => {
        console.error('Ошибка подключения SMTP:', error);
        throw new Error('Ошибка подключения к почтовому серверу');
      });

    // Формируем письмо
    const mailOptions = {
      from: `"Форма обратной связи" <${
        process.env.EMAIL_SENDER || process.env.EMAIL_USER
      }>`,
      to: process.env.EMAIL_RECIPIENT,
      subject: `Новая заявка от ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #1890ff;">Новая заявка с сайта</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
        </div>
      `,
      text: `Новая заявка\nИмя: ${name}\nТелефон: ${phone}\nДата: ${new Date().toLocaleString(
        'ru-RU'
      )}`,
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Произошла ошибка при отправке',
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
