def chatbot():
    user_message = request.json.get("message", "")

    # Query the local query engine
    query_engine = index.as_query_engine()
    local_response = str(query_engine.query(user_message))

    # Prepare a prompt for OpenAI that gives it the local response as context
    # and asks it to generate a detailed answer that includes this local data.
    openai_prompt = f"In my local files, I found: '{local_response}'. " \
        f"Considering this, can you provide a detailed answer for: '{
            user_message}'?"

    openai_response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=openai_prompt,
        max_tokens=250
    )
    openai_text_response = openai_response.choices[0].text.strip()

    # No longer need to manually combine both responses, as OpenAI's response should be comprehensive
    combined_response = openai_text_response

    # Logging (optional)
    print(f'########### Local response: {str(local_response)}')
    print(f'########### OpenAI response: {openai_text_response}')
    print(f'########### query: {user_message}')
    print(f'########### {type(local_response)}')
    print(f'########### {type(user_message)}')

    return combined_response
