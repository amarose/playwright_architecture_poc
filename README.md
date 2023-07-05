# playwright_architecture_poc

Example architecture for playwright tests

### Zalozenia

- Korzystamy z POM
- Inicjalizacje PageObjectu robimy w hook'u beforeEach
- Test importujemy za pomocą import { test } from "../playwright/fixtures";
- Autoryzacja ograna jest w /playwright/fixtures
- Korzystamy z paternu AAA
- Do karzdego speca dodajemy test.describe.configure({mode: 'serial'}), zeby testy wykonywały sie sekwencyjnie w 1 specu
- Testy parallel - 1 worker per 1 spec
- W przypadku globalnych komponentów, tworzymy taki component w /components
- Predefiniowane dane testowe trzymamy w /test-data
- credentialse - konta dla workerów trzymamy w creds.data.ts
- do requestow API apki PPG korzystamy z gotowego rozwiązania z ppgApi.utils.ts
- Staremy się dzielić specki na pomniejsze describe'y (zamiast pakować wszystko w jeden) - 1 describe per komponent dla danego page'a
- Pojedynczy test nie powinien przekraczać 30 sekund
- Piszemy testy w pełnej izolacji, tzn kazdy describe tworzy sobie dane testowe i po sobie sprząta
- Zaleznosci między testami dozwolone jedynie w obrebie tego samego describe'a
- Jak odpalic testy
