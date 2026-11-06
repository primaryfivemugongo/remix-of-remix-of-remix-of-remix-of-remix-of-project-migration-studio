import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Index } from '@/routes/index';

afterEach(() => { cleanup(); sessionStorage.clear(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function mountDoor() {
  vi.useFakeTimers();
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  const { container } = render(<Index />);
  const door = container.querySelector('.rope');
  const shelves = container.querySelector('.page-wrapper');
  if (!door || !shelves) throw new Error('Missing door or shelves');
  return { door, shelves };
}

describe('Homepage door gestures', () => {
  it('absorbs a touch gesture and opens on release without exposing books during the gesture', () => {
    const { door, shelves } = mountDoor();
    fireEvent.touchStart(door);
    fireEvent.touchMove(door);
    expect(door).not.toHaveClass('door-open');
    expect(shelves).toHaveAttribute('inert');
    expect(fireEvent.touchEnd(door)).toBe(false);
    expect(door).toHaveClass('door-open');
    expect(shelves).not.toHaveAttribute('inert');
  });

  it('waits for a completed mouse click rather than opening under a held pointer', () => {
    const { door } = mountDoor();
    fireEvent.pointerDown(door);
    expect(door).not.toHaveClass('door-open');
    fireEvent.click(door);
    expect(door).toHaveClass('door-open');
  });
});