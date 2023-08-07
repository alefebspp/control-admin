export async function getUser(token: string | undefined) {
  const response = await fetch('http://localhost:3000/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const { user_id } = await response.json();

  return user_id;
}

export async function getCollaborator(token?: string) {
  const id = await getUser(token);

  const response = await fetch(
    `http://localhost:3000/collaborator/find/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  return data;
}
