# How to Set Up Credentials

1. Go to the ATH Móvil [configuration page](https://www.athmovil.com/web/config.htm) and click on 'Change Security Questions'. This will bring you to [this page](https://www.athmovil.com/web/editquestions.htm).

2. On the 'Change Security Questions' page select the questions that you want and answer them.

3. Use the list below to determine the IDs of your selected questions.

4. Use these IDs to set up your credentials object like this:

```js
const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};
```

6. Click continue.

7. Now you can use that object to instantiate an Athm class. You are done.

# Questions and their IDs

Q1.1: ¿En qué ciudad estaba tu escuela superior?

Q1.2: ¿Cuál es el nombre de tu abuela materna?

Q1.3: ¿Cuál es el segundo apellido de tu padre?

Q1.4: ¿Cuál era el nombre de tu escuela superior?

Q1.5: ¿Cuál es el nombre de la primera compañía donde trabajaste?

Q1.6: ¿Cuál es el nombre de tu madrina de bodas?

Q1.7: ¿Cuál es el nombre de tu sobrino(a) mayor?

Q1.8: ¿Cuál es el nombre de tu abuelo materno?

Q1.9: ¿Cuál es el nombre de tu mejor amigo(a)?

Q1.10: ¿En qué ciudad te casaste? (Nombre completo de la ciudad solamente)

Q2.1: ¿Cuál es el nombre de tu padrino de bodas?

Q2.2: ¿Cuál era la mascota de tu escuela superior?

Q2.3: ¿Cuál es el nombre de tu primer supervisor?

Q2.4: ¿En qué ciudad nació tu padre? (Nombre completo de la ciudad solamente)

Q2.5: ¿Cuál es el nombre de tu primer novio(a)?

Q2.6: ¿Cuál es el nombre de tu primera mascota?

Q2.7: ¿Cuál es tu palabra/frase favorita?

Q2.8: ¿Cuál es el nombre de tu abuela paterna?

Q2.9: ¿En cuál ciudad queda tu casa vacacional? (Nombre completo de la ciudad solamente)

Q2.10: ¿Cuál era el apodo de tu abuelo?

Q3.1: ¿En qué ciudad nació tu madre? (Nombre completo de la ciudad solamente)

Q3.2: ¿Cuál es el segundo apellido de tu madre?

Q3.3: ¿En qué ciudad naciste? (Nombre completo de la ciudad solamente)

Q3.4: ¿En qué ciudad conociste a tu esposa(o)? (Nombre completo de la ciudad solamente)

Q3.5: ¿Cuál era tu restaurante preferido en la universidad?

Q3.6: ¿Cuál es el nombre de tu abuelo paterno?

Q3.7: ¿Cuál era la marca de tu primer carro?

Q3.8: ¿Cuál era el apellido de tu maestro(a) favorito en escuela superior?

Q3.9: ¿Cuál es el nombre de la ciudad o pueblo donde vivía tu abuela? (Nombre completo de la ciudad o pueblo solamente)

Q3.10: ¿En qué ciudad vivía tu mejor amigo(a) de escuela superior? (Nombre completo de la ciudad solamente)

## Important Note

Remember to store your credentials in a safe place. Also, if the given credentials are wrong your account could be temporarily blocked and require you to reset the password using an SMS verification code.