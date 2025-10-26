import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type UserRole = 'guest' | 'seller' | 'fulfillment';

interface Request {
  id: number;
  title: string;
  category: string;
  city: string;
  qty: number;
  budget: string;
  deadline: string;
  status: 'active' | 'in-progress' | 'completed';
  responses: number;
}

const mockRequests: Request[] = [
  {
    id: 1,
    title: 'Упаковка электроники 500 шт',
    category: 'Электроника',
    city: 'Москва',
    qty: 500,
    budget: '150 000 ₽',
    deadline: '5 дней',
    status: 'active',
    responses: 3
  },
  {
    id: 2,
    title: 'Хранение одежды 1000 единиц',
    category: 'Одежда',
    city: 'Санкт-Петербург',
    qty: 1000,
    budget: '80 000 ₽',
    deadline: '7 дней',
    status: 'active',
    responses: 5
  },
  {
    id: 3,
    title: 'Упаковка косметики 300 шт',
    category: 'Косметика',
    city: 'Казань',
    qty: 300,
    budget: '45 000 ₽',
    deadline: '3 дня',
    status: 'active',
    responses: 2
  }
];

function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'requests' | 'pricing'>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRequests = selectedCategory === 'all' 
    ? mockRequests 
    : mockRequests.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-depo-red text-white px-3 py-1.5 font-bold text-xl tracking-tight transform -skew-x-6">
                DEPO44
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-gray-700 hover:text-depo-cyan transition-colors font-medium"
              >
                Главная
              </button>
              <button 
                onClick={() => setCurrentView('requests')}
                className="text-gray-700 hover:text-depo-cyan transition-colors font-medium"
              >
                Лента заявок
              </button>
              <button 
                onClick={() => setCurrentView('pricing')}
                className="text-gray-700 hover:text-depo-cyan transition-colors font-medium"
              >
                Тарифы
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Select value={userRole} onValueChange={(v) => setUserRole(v as UserRole)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest">Гость</SelectItem>
                  <SelectItem value="seller">Селлер</SelectItem>
                  <SelectItem value="fulfillment">Фулфилмент</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="default" className="bg-depo-cyan hover:bg-depo-cyan/90">
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {currentView === 'home' && (
        <main>
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <Badge className="mb-4 bg-depo-red hover:bg-depo-red/90">Быстро • Выгодно • Надёжно</Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Упакуем, сохраним,<br />
                <span className="text-depo-cyan">отправим</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                DEPO44 соединяет селлеров маркетплейсов с надёжными фулфилментами. 
                Публикуйте заявки бесплатно, получайте предложения за 24 часа.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-depo-red hover:bg-depo-red/90 text-lg px-8"
                  onClick={() => setCurrentView('requests')}
                >
                  <Icon name="Plus" className="mr-2" size={20} />
                  Создать заявку
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 border-depo-cyan text-depo-cyan hover:bg-sky-50"
                  onClick={() => setCurrentView('pricing')}
                >
                  <Icon name="Building2" className="mr-2" size={20} />
                  Подключить склад
                </Button>
              </div>
            </div>
          </section>

          <section className="bg-white py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
              
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-depo-cyan flex items-center gap-2">
                    <Icon name="Package" size={28} />
                    Для селлеров
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 animate-fade-in">
                      <div className="bg-sky-100 text-depo-cyan rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Создайте заявку</h4>
                        <p className="text-gray-600">Опишите товар, количество, сроки и бюджет</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <div className="bg-sky-100 text-depo-cyan rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Получите предложения</h4>
                        <p className="text-gray-600">Фулфилменты откликнутся с ценами и условиями</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <div className="bg-sky-100 text-depo-cyan rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Выберите исполнителя</h4>
                        <p className="text-gray-600">Сравните предложения и начните работу</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-depo-red flex items-center gap-2">
                    <Icon name="Warehouse" size={28} />
                    Для фулфилментов
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 animate-fade-in">
                      <div className="bg-red-100 text-depo-red rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Подключите склад</h4>
                        <p className="text-gray-600">Заполните профиль и выберите тариф</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <div className="bg-red-100 text-depo-red rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Находите клиентов</h4>
                        <p className="text-gray-600">Смотрите заявки по вашим категориям и городам</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <div className="bg-red-100 text-depo-red rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Отправляйте предложения</h4>
                        <p className="text-gray-600">Предложите цену и получите новых клиентов</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-br from-depo-cyan to-depo-sky text-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                <div className="animate-scale-in">
                  <div className="text-5xl font-bold mb-2">100+</div>
                  <div className="text-sky-100">Фулфилментов в базе</div>
                </div>
                <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <div className="text-5xl font-bold mb-2">24ч</div>
                  <div className="text-sky-100">Среднее время отклика</div>
                </div>
                <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-5xl font-bold mb-2">30%</div>
                  <div className="text-sky-100">Экономия бюджета</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {currentView === 'requests' && (
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Лента заявок</h1>
                <p className="text-gray-600">Активные заявки от селлеров маркетплейсов</p>
              </div>
              <Button className="bg-depo-red hover:bg-depo-red/90">
                <Icon name="Plus" className="mr-2" size={20} />
                Создать заявку
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="Электроника">Электроника</SelectItem>
                  <SelectItem value="Одежда">Одежда</SelectItem>
                  <SelectItem value="Косметика">Косметика</SelectItem>
                </SelectContent>
              </Select>

              <Input 
                placeholder="Поиск по городу..." 
                className="flex-1"
              />

              <Button variant="outline" className="border-depo-cyan text-depo-cyan hover:bg-sky-50">
                <Icon name="Filter" className="mr-2" size={18} />
                Фильтры
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request, idx) => (
                <Card 
                  key={request.id} 
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-l-4 border-l-depo-cyan"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{request.category}</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {request.status === 'active' ? 'Активна' : 'В работе'}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{request.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-2">
                      <Icon name="MapPin" size={14} />
                      {request.city}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Количество:</span>
                        <span className="font-semibold">{request.qty} шт</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Бюджет:</span>
                        <span className="font-semibold text-depo-cyan">{request.budget}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Дедлайн:</span>
                        <span className="font-semibold">{request.deadline}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Icon name="MessageSquare" size={14} />
                          {request.responses} откликов
                        </span>
                        <Button 
                          size="sm" 
                          className={userRole === 'fulfillment' ? 'bg-depo-red hover:bg-depo-red/90' : ''}
                          disabled={userRole !== 'fulfillment'}
                        >
                          {userRole === 'fulfillment' ? 'Откликнуться' : 'Подробнее'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {userRole === 'guest' && (
              <Card className="mt-8 bg-gradient-to-r from-sky-50 to-cyan-50 border-sky-200">
                <CardContent className="py-8 text-center">
                  <Icon name="Lock" size={48} className="mx-auto mb-4 text-depo-cyan" />
                  <h3 className="text-xl font-bold mb-2">Войдите для полного доступа</h3>
                  <p className="text-gray-600 mb-4">
                    Зарегистрируйтесь как фулфилмент, чтобы откликаться на заявки
                  </p>
                  <Button className="bg-depo-cyan hover:bg-depo-cyan/90">
                    Зарегистрироваться
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      )}

      {currentView === 'pricing' && (
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">Тарифы для фулфилментов</h1>
              <p className="text-xl text-gray-600">
                Выберите тариф для подключения склада к платформе
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Start</CardTitle>
                  <CardDescription>Для начинающих складов</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">4 990 ₽</div>
                    <div className="text-gray-600">в месяц</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>10 откликов в месяц</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Базовые фильтры</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Уведомления в Telegram</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Профиль в каталоге</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-depo-red relative animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-depo-red hover:bg-depo-red/90">Популярный</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <CardDescription>Для активных складов</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-depo-red">9 990 ₽</div>
                    <div className="text-gray-600">в месяц</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>30 откликов в месяц</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Расширенные фильтры</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Приоритет в ленте</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Бейдж «Проверенный»</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Аналитика откликов</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-depo-red hover:bg-depo-red/90">
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl">Max</CardTitle>
                  <CardDescription>Для крупных операторов</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">19 990 ₽</div>
                    <div className="text-gray-600">в месяц</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span><strong>Безлимит</strong> откликов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Все фильтры + API</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>ТОП в ленте</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Персональный менеджер</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Расширенная аналитика</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-600 mt-0.5" size={20} />
                      <span>Интеграция с ERP</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-depo-cyan hover:bg-depo-cyan/90">
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-depo-cyan to-depo-sky text-white">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Попробуйте бесплатно</h3>
                    <p className="text-sky-100">
                      Получите 3 бесплатных отклика при регистрации
                    </p>
                  </div>
                  <Button size="lg" className="bg-white text-depo-cyan hover:bg-gray-100">
                    <Icon name="Gift" className="mr-2" size={20} />
                    Активировать пробный период
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      <footer className="bg-depo-dark text-gray-300 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="bg-depo-red text-white px-3 py-1.5 font-bold text-xl tracking-tight transform -skew-x-6 inline-block mb-4">
                DEPO44
              </div>
              <p className="text-sm text-gray-400">
                B2B-платформа для соединения селлеров и фулфилментов
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-depo-sky transition-colors">Как это работает</a></li>
                <li><a href="#" className="hover:text-depo-sky transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-depo-sky transition-colors">Лента заявок</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-depo-sky transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-depo-sky transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-depo-sky transition-colors">Блог</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Документы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-depo-sky transition-colors">Оферта</a></li>
                <li><a href="#" className="hover:text-depo-sky transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-depo-sky transition-colors">Агентский договор</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div>© 2025 ООО «ДЕПО44». Все права защищены.</div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-depo-sky transition-colors">
                <Icon name="Send" size={20} />
              </a>
              <a href="#" className="hover:text-depo-sky transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
