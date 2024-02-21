import openai from 'openai';

export class CompletionAwareMixin {
  clientReady: Promise<boolean>;

  client: openai;

  public async getChatCompletion(model: string, messages: any[], functions?: any[]): Promise<any> {
    await this.clientReady;
    try {
      const requestObject = {
        model,
        messages,
      };
      if (functions) {
        requestObject['functions'] = functions;
      }

      console.log(JSON.stringify(requestObject, null, 2));
      console.log(this.client.baseURL)
      const response = await this.client.chat.completions.create(requestObject);
      console.log(JSON.stringify(response, null, 2));
      if (!response && !response.choices && !response.choices[0] && !response.choices[0].message) {
        throw new Error(`Error response from OpenAI API: ${JSON.stringify(response)}`);
      }
      return response;
    } catch (error) {
      throw new Error(`Error response from OpenAI API: ${error.message}`);
    }
  }
}
