import { beforeEach, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// vider la sauvegarde avant chaque test
beforeEach(() => {
  localStorage.clear();
});

test('ajouter une tâche à la liste', () => {
  // afficher le composant
  render(<App />);

  // saisir une tâche
  fireEvent.change(screen.getByLabelText(/nouvelle tâche/i), {
    target: { value: 'Faire les courses' },
  });

  // cliquer sur Ajouter
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }));

  // vérifier que la tâche apparaît et que le champ est vidé
  expect(screen.getByText('Faire les courses')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveValue('');
});

test('cocher une tâche comme faite', () => {
  // afficher le composant
  render(<App />);

  // ajouter une tâche
  fireEvent.change(screen.getByLabelText(/nouvelle tâche/i), {
    target: { value: 'Lire le cours' },
  });

  fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }));

  // cocher la tâche
  const checkbox = screen.getByRole('checkbox', {
    name: 'Lire le cours',
  });

  fireEvent.click(checkbox);

  // vérifier que la case est cochée et le texte barré
  expect(checkbox).toBeChecked();
  expect(screen.getByText('Lire le cours')).toHaveStyle({
    textDecoration: 'line-through',
  });

  // vérifier qu'il ne reste aucune tâche à faire
  expect(screen.getByText('Tâches restant à faire : 0')).toBeInTheDocument();
});