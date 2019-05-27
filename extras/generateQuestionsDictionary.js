// Script to automatically generate the questions dictionary.

const $ = require('cheerio');
const fs = require('fs');

// Content scraped from the site. Automate.
const html = `
<fieldset id="tab-2">
                      <label class="instruction defined">Pregunta</label>
  <div class="well">
      <a class="choose_first_option fleeting" data-target-class="question" href="https://www.athmovil.com/web/resetCredentials.htm#ver_mas_preguntas" style="display: none;"></a>
                <input class="special_question" id="customerRsaQuestions_question1_1" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.9"><label class="special radio question" for="customerRsaQuestions_question1_1" style="display: none;">¿Cuál es el nombre de tu mejor amigo(a)?</label>
              <input class="special_question" id="customerRsaQuestions_question1_2" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.4"><label class="special radio question " for="customerRsaQuestions_question1_2" style="display: none;">¿Cuál era el nombre de tu escuela superior?</label>
              <input class="special_question" id="customerRsaQuestions_question1_3" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.7"><label class="special radio question " for="customerRsaQuestions_question1_3" style="display: none;">¿Cuál es el nombre de tu sobrino(a) mayor?</label>
              <input class="special_question" id="customerRsaQuestions_question1_4" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.1"><label class="special radio question " for="customerRsaQuestions_question1_4" style="display: none;">¿En qué ciudad estaba tu escuela superior?</label>
              <input class="special_question" id="customerRsaQuestions_question1_5" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.8"><label class="special radio question  checked" for="customerRsaQuestions_question1_5" style="display: block;">¿Cuál es el nombre de tu abuelo materno?</label>
              <input class="special_question" id="customerRsaQuestions_question1_6" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.5"><label class="special radio question " for="customerRsaQuestions_question1_6" style="display: none;">¿Cuál es el nombre de la primera compañía donde trabajaste?</label>
              <input class="special_question" id="customerRsaQuestions_question1_7" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.10"><label class="special radio question " for="customerRsaQuestions_question1_7" style="display: none;">¿En qué ciudad te casaste?  (Nombre completo de la ciudad solamente)</label>
              <input class="special_question" id="customerRsaQuestions_question1_8" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.2"><label class="special radio question " for="customerRsaQuestions_question1_8" style="display: none;">¿Cuál es el nombre de tu abuela materna?</label>
              <input class="special_question" id="customerRsaQuestions_question1_9" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.6"><label class="special radio question " for="customerRsaQuestions_question1_9" style="display: none;">¿Cuál es el nombre de tu madrina de bodas?</label>
              <input class="special_question" id="customerRsaQuestions_question1_10" name="customerRsaQuestions.question1" required="" type="radio" value="Q1.3"><label class="special radio question " for="customerRsaQuestions_question1_10" style="display: none;">¿Cuál es el segundo apellido de tu padre?</label>
    </div>
          	 <label class="instruction" for="customerRsaQuestions.answer1">Respuesta</label>
	         	 <input type="text" id="customerRsaQuestions.answer1" aria-label="customerRsaQuestions.answer1" name="customerRsaQuestions.answer1" value="" class="required valid" data-error-msg="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="20">     	    
                      <label class="instruction defined">Pregunta</label>
  <div class="well">
      <a class="choose_first_option fleeting" data-target-class="question" href="https://www.athmovil.com/web/resetCredentials.htm#ver_mas_preguntas" style="display: none;"></a>
                <input class="special_question" id="customerRsaQuestions_question2_1" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.9"><label class="special radio question checked" for="customerRsaQuestions_question2_1">¿En cuál ciudad queda tu casa vacacional? (Nombre completo de la ciudad solamente)</label>
              <input class="special_question" id="customerRsaQuestions_question2_2" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.6"><label class="special radio question " for="customerRsaQuestions_question2_2" style="display: block;">¿Cuál es el nombre de tu primera mascota?</label>
              <input class="special_question" id="customerRsaQuestions_question2_3" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.8"><label class="special radio question " for="customerRsaQuestions_question2_3" style="display: block;">¿Cuál es el nombre de tu abuela paterna?</label>
              <input class="special_question" id="customerRsaQuestions_question2_4" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.4"><label class="special radio question " for="customerRsaQuestions_question2_4" style="display: block;">¿En qué ciudad nació tu padre? (Nombre completo de la ciudad solamente)</label>
              <input class="special_question" id="customerRsaQuestions_question2_5" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.10"><label class="special radio question " for="customerRsaQuestions_question2_5" style="display: block;">¿Cuál era el apodo de tu abuelo?</label>
              <input class="special_question" id="customerRsaQuestions_question2_6" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.1"><label class="special radio question " for="customerRsaQuestions_question2_6" style="display: block;">¿Cuál es el nombre de tu padrino de bodas?</label>
              <input class="special_question" id="customerRsaQuestions_question2_7" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.2"><label class="special radio question " for="customerRsaQuestions_question2_7" style="display: block;">¿Cuál era la mascota de tu escuela superior?</label>
              <input class="special_question" id="customerRsaQuestions_question2_8" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.5"><label class="special radio question " for="customerRsaQuestions_question2_8" style="display: block;">¿Cuál es el nombre de tu primer novio(a)?</label>
              <input class="special_question" id="customerRsaQuestions_question2_9" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.3"><label class="special radio question " for="customerRsaQuestions_question2_9" style="display: block;">¿Cuál es el nombre de tu primer supervisor?</label>
              <input class="special_question" id="customerRsaQuestions_question2_10" name="customerRsaQuestions.question2" required="" type="radio" value="Q2.7"><label class="special radio question " for="customerRsaQuestions_question2_10" style="display: block;">¿Cuál es tu palabra/frase favorita?</label>
    </div>
    	  	 <label class="instruction" for="customerRsaQuestions.answer2">Respuesta</label>
	         	 <input type="text" id="customerRsaQuestions.answer2" aria-label="customerRsaQuestions.answer2" name="customerRsaQuestions.answer2" value="" class="required" data-error-msg="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="20">     	    
                      <label class="instruction defined">Pregunta</label>
  <div class="well">
      <a class="choose_first_option fleeting" data-target-class="question" href="https://www.athmovil.com/web/resetCredentials.htm#ver_mas_preguntas" style="display:none"></a>
                <input class="special_question" id="customerRsaQuestions_question3_1" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.6" checked=""><label class="special radio question checked" for="customerRsaQuestions_question3_1">¿Cuál es el nombre de tu abuelo paterno? </label>
              <input class="special_question" id="customerRsaQuestions_question3_2" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.7"><label class="special radio question " for="customerRsaQuestions_question3_2" style="display: none;">¿Cuál era la marca de tu primer carro?</label>
              <input class="special_question" id="customerRsaQuestions_question3_3" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.2"><label class="special radio question " for="customerRsaQuestions_question3_3" style="display: none;">¿Cuál es el segundo apellido de tu madre?</label>
              <input class="special_question" id="customerRsaQuestions_question3_4" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.8"><label class="special radio question " for="customerRsaQuestions_question3_4" style="display: none;">¿Cuál era el apellido de tu maestro(a) favorito en escuela superior?</label>
              <input class="special_question" id="customerRsaQuestions_question3_5" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.1"><label class="special radio question " for="customerRsaQuestions_question3_5" style="display: none;">¿En qué ciudad nació tu madre? (Nombre completo de la ciudad solamente)</label>
              <input class="special_question" id="customerRsaQuestions_question3_6" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.10"><label class="special radio question " for="customerRsaQuestions_question3_6" style="display: none;">¿En qué ciudad vivía tu mejor amigo(a) de escuela superior? (Nombre completo de la ciudad solamente)</label>
              <input class="special_question" id="customerRsaQuestions_question3_7" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.9"><label class="special radio question " for="customerRsaQuestions_question3_7" style="display: none;">¿Cuál es el nombre de la ciudad o pueblo donde vivía tu abuela? (Nombre completo de la ciudad o pueblo solamente)</label>
              <input class="special_question" id="customerRsaQuestions_question3_8" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.4"><label class="special radio question " for="customerRsaQuestions_question3_8" style="display: none;">¿En qué ciudad conociste a tu esposa(o)? (Nombre completo de la ciudad solamente)</label>
              <input class="special_question" id="customerRsaQuestions_question3_9" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.5"><label class="special radio question " for="customerRsaQuestions_question3_9" style="display: none;">¿Cuál era tu restaurante preferido en la universidad?</label>
              <input class="special_question" id="customerRsaQuestions_question3_10" name="customerRsaQuestions.question3" required="" type="radio" value="Q3.3"><label class="special radio question " for="customerRsaQuestions_question3_10" style="display: none;">¿En qué ciudad naciste? (Nombre completo de la ciudad solamente)</label>
    </div>
    	  	 <label class="instruction" for="customerRsaQuestions.answer3">Respuesta</label>
	         	 <input type="text" id="customerRsaQuestions.answer3" aria-label="customerRsaQuestions.answer3" name="customerRsaQuestions.answer3" value="" class="required" data-error-msg="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="20">     	          <hr class="hide_mobile">
          <input type="submit" class="button highlight forward" name="_target9" value="Enviar →">
		  <button type="button" class="button cancel" onclick="window.location.assign(&#39;/web/cancelRegainAccess.htm&#39;)">Cancelar</button>
    </fieldset>
`;

// Parses the given HTML and exctracts the questions.
// Returns an object with pairs of questions and their IDs.
function parseQuestions(html) {
    const questions = {};
    $('label', html).each(function (index, element) {
        questionId = $(element).prev().attr('value');
        questionText = $(element).text();

        if (questionId) {
            questions[questionId] = questionText;
        }
    });

    const orderedQuestions = {};
    Object.keys(questions).sort().forEach(function (key) {
        orderedQuestions[key] = questions[key];
    });

    return orderedQuestions;
}

// Returns 'true' if there are falsy values present in the 'questions' object.
function checkQuestions(questions, verbose = false) {
    var error = false;
    for (let unit = 1; unit <= 3; unit++) {
        for (let decimal = 1; decimal <= 10; decimal++) {
            let item = 'Q' + unit + "." + decimal;

            if (questions[item]) {
                if (verbose) {
                    console.log(item, questions[item]);
                }
            } else {
                if (verbose) {
                    console.log('****** Error:', item);
                }
                error = true;
            }
        }
    }
    if (error) {
        return true;
    } else {
        return false;
    }
}

// Saves the given questions as an importable JS file.
function saveToDisk(questions) {
    let text = '// This file has been generated using "generateQuestionsDictionary.js" \n\n'
    text += "const questions = " + JSON.stringify(questions, null, 2) + '\n\nexports.questions = questions;';

    fs.writeFile("questionsDictionary.js", text, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file has been saved.");
    });
}

// Parse the questions, check them, then save to disk
let questions = parseQuestions(html);

if (checkQuestions(questions, false)) {
    console.log('Error detected.');
} else {
    console.log(questions);
    saveToDisk(questions);
}